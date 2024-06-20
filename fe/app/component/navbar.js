'use client'

import Link from 'next/link'
import React from 'react'

const navbar = () => {
 return (
 <>
    <nav class="navbar fixed-top bg-body-tertiary">
        <div class="container-fluid">
            <Link class="navbar-brand" href="/">Blogs</Link>
            <Link class="navbar-brand" href="/users">Login</Link>
        </div>
    </nav>
 </>
 )
}

export default navbar