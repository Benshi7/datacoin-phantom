/* 
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

 */

 
create extension if not exists "uuid-ossp";


create table public.profiles (
  id uuid primary key default uuid_generate_v4(),
  wallet_address text unique not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.profile_completion (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  email_verified boolean default false,
  telegram_username text,
  telegram_verified boolean default false,
  twitter_username text,
  twitter_verified boolean default false,
  instagram_username text,
  instagram_verified boolean default false,
  telegram_group_joined boolean default false,
  reward_claimed boolean default false,
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

create table public.health_data (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  blood_type text,
  height numeric,
  weight numeric,
  allergies text[],
  conditions text[],
  medications text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.financial_data (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  credit_score integer,
  income_range text,
  investment_preferences text[],
  risk_tolerance text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.geo_data (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  location_history jsonb,
  frequent_places jsonb[],
  travel_patterns jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.social_data (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  social_connections jsonb,
  interaction_patterns jsonb,
  interests text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.internet_data (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  browsing_history jsonb,
  search_patterns jsonb,
  online_preferences text[],
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
  health_data_preferences jsonb default '{}',
  financial_data_preferences jsonb default '{}',
  location_data_preferences jsonb default '{}',
  social_data_preferences jsonb default '{}',
  internet_data_preferences jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.user_files (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  category text not null,
  file_name text not null,
  file_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
alter table public.profile_completion enable row level security;
alter table public.user_data enable row level security;
alter table public.health_data enable row level security;
alter table public.financial_data enable row level security;
alter table public.geo_data enable row level security;
alter table public.social_data enable row level security;
alter table public.internet_data enable row level security;
alter table public.data_sharing_history enable row level security;
alter table public.user_settings enable row level security;
alter table public.user_files enable row level security;

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

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_data (id)
  values (new.id);
  
  insert into public.user_settings (user_id)
  values (new.id);
  
  insert into public.profile_completion (user_id)
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

