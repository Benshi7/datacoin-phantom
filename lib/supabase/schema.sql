
create extension if not exists "uuid-ossp";


create table public.profiles (
  id uuid primary key default uuid_generate_v4(),
  wallet_address text unique not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.user_data (
  id uuid references public.profiles(id) on delete cascade primary key,
  balance decimal default 0,
  data_points integer default 0,
  active_shares integer default 0,
  trust_score integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);


create table public.data_sharing_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  data_type text not null,
  points_earned integer not null,
  shared_at timestamp with time zone default timezone('utc'::text, now()) not null
);


create table public.user_settings (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  health_data_sharing boolean default false,
  financial_data_sharing boolean default false,
  location_data_sharing boolean default false,
  social_data_sharing boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);


alter table public.profiles enable row level security;
alter table public.user_data enable row level security;
alter table public.data_sharing_history enable row level security;
alter table public.user_settings enable row level security;


create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid()::text = id::text);

create policy "Users can view own data"
  on public.user_data for select
  using (auth.uid()::text = id::text);

create policy "Users can update own data"
  on public.user_data for update
  using (auth.uid()::text = id::text);

create policy "Users can view own history"
  on public.data_sharing_history for select
  using (auth.uid()::text = user_id::text);

create policy "Users can insert own history"
  on public.data_sharing_history for insert
  with check (auth.uid()::text = user_id::text);

create policy "Users can view own settings"
  on public.user_settings for select
  using (auth.uid()::text = user_id::text);

create policy "Users can update own settings"
  on public.user_settings for update
  using (auth.uid()::text = user_id::text);

-- Create functions
create or replace function public.handle_new_user()
returns trigger as $$
begin

  insert into public.user_data (id)
  values (new.id);

  insert into public.user_settings (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;


create trigger on_auth_user_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_user();


create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_user_data_updated_at
  before update on public.user_data
  for each row execute procedure public.handle_updated_at();

create trigger handle_user_settings_updated_at
  before update on public.user_settings
  for each row execute procedure public.handle_updated_at();

