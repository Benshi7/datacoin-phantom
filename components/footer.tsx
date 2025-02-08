import React from 'react'
import { Database, Twitter, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
]

const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Pricing', href: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Contact', href: '#' }
    ]
  }
]

export function Footer () {
  return (
    <footer className='border-t bg-background relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-background via-background to-background/80' />
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]' />

      <div className='container mx-auto relative'>
        <div className='grid grid-cols-1 md:grid-cols-6 gap-12 py-12'>
          <div className='md:col-span-2 space-y-4'>
            <Link
              href='/'
              className='flex items-center space-x-2 hover:opacity-80 transition-opacity'
            >
              <div className='w-8 h-8 rounded bg-primary/10 flex items-center justify-center'>
                <Database className='h-5 w-5 text-primary' />
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                DataCoin
              </span>
            </Link>
            <p className='text-sm text-muted-foreground max-w-[300px]'>
              Empowering users to securely monetize their data while maintaining
              privacy and control.
            </p>
            <div className='flex gap-4 pt-2'>
              {socialLinks.map(social => (
                <Link
                  key={social.label}
                  href={social.href}
                  className='text-muted-foreground hover:text-primary transition-colors'
                  aria-label={social.label}
                >
                  <social.icon className='h-5 w-5' />
                </Link>
              ))}
            </div>
          </div>

          <div className='md:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8'>
            {footerLinks.map(group => (
              <div key={group.title} className='space-y-3'>
                <h4 className='text-sm font-medium'>{group.title}</h4>
                <ul className='space-y-2'>
                  {group.links.map(link => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className='text-sm text-muted-foreground hover:text-primary transition-colors'
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='border-t py-6 text-center text-sm text-muted-foreground'>
          <p>© {new Date().getFullYear()} DataCoin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
