---
title: "New Year, New Site"
date: "2022-01-04"
tags: ["meta"]
summary: "Building my personal website from scratch..."
---

It's a new year and I told myself I would make a fresh new personal website. Previously, I had my homepage set to a scrolling background with social media links. I didn't even have my blog linked on the homepage because Ghost, the blogging platform I was using, would occasionally and unexpectedly run into service unavailable errors. I was never able to determine the cause of the error because it would happen randomly after a couple months of smooth operation. I had to always restart the Ghost instance when I encountered the error.

Creating a new website has been on my todo list for a while now. Aside from the fact that the former website only consisted of an "empty" homepage, there were other reasons and motivations for me to want to make a new one:

1. I had worked with React for 2 years now, and I figured now was a good time to apply that experience towards a personal project.
2. My blog posts on Ghost were lost when I upgraded Ghost to v2. Since I lost all my content, I figured it was time to start fresh.
3. I wanted to design my own site.
4. I wanted to learn something new while in the process of building the site.

I decided to use [Next.js](https://nextjs.org) as my frontend framework for building the site. I chose Next.js because it had static site generation capabilities, which was new territory to me. Since it's built off of React, the learning curve wouldn't be too big. I also wanted to learn a new CSS framework, so I opted for [Tailwind CSS](https://tailwindcss.com). Tailwind advertises itself as a utility-first CSS framework. I found that to be more appealing than using Bootstrap since I would have more control over my website's design.

What you're seeing now is my revamped website. I'm still working on it as I have yet to include my past works and resume, but I have the general layout and design done. Since I used Next.js as the frontend framework, I leveraged its static site generation capabilities to pre-render all the content during build time. That would essentially allow quicker serving of the pages. In addition, I can write my posts in markdown files, include them in my GitHub repo, and then never have to worry about losing them again if my blog gets accidentally nuked.

## Updates

#### 2022-01-08

So I finally finished building my website. There were quite a few challenges during the development process, particulary getting the backdrop blurring of the mobile menu to work nicely. Overall, I found this project to be fun. I especially liked building the experience list component for my resume.

The source code to the site can be found [here](https://github.com/resurrexi/pursuitofzen).
