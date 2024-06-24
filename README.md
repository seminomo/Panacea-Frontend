<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]




<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#running-and-deploying">Running and Deploying</a></li>
    <li><a href="#running-the-project">Running the Project</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#project-tree">Project Tree</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#members">Members</a></li>
    <li><a href="#project-status">Project Status</a></li>
  </ol>
</details>

## About The Project
Panacea
結合了營養師、心理師、職涯教練的媒合功能，提供完善的身心靈健康建議，為追求更好自我和生活品質的人們搭建一個良好的溝通管道。

### Built With
- [![React][React.js]][React-url]
- [![Next][Next.js]][Next-url]
- [![AntDesign][AntDesign.com]][AntDesign-url]
- [![Vercel][Vercel]][Vercel-url]
- [![Zustand][Zustand]][Zustand-url]

## Getting Started

### Prerequisites
Node.js 版本建議為：`20.11.1` 以上

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/hex-2024-panacea/Panacea-Frontend
   ```
2. Install packages
   ```sh
   pnpm install
   ```
3. 環境變數設定，複製 `.env.example` 檔案，並根據 `.env` 內容設置環境變數
   ```sh
   cp .env.example .env.local
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Environment Variables
```env
NEXT_PUBLIC_API_URL= # API_URL
```

### Running and Deploying
<!-- Include information on how to run and deploy the project. -->

#### Running the Project
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Deployment

```bash
pnpm build
pnpm start
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Tree
<!-- Show the project's file structure to help users understand how the project is organized. -->

## Documentation
<!-- Provide links to detailed project documentation or include detailed documentation directly. -->

## Members
<!-- List the project members and their roles. -->

## Project Status
<!-- Explain the current status of the project, including development progress and future plans. -->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/hex-2024-panacea/Panacea-Frontend.svg?style=for-the-badge
[contributors-url]: https://github.com/hex-2024-panacea/Panacea-Frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/hex-2024-panacea/Panacea-Frontend.svg?style=for-the-badge
[forks-url]: https://github.com/hex-2024-panacea/Panacea-Frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/hex-2024-panacea/Panacea-Frontend.svg?style=for-the-badge
[stars-url]: https://github.com/hex-2024-panacea/Panacea-Frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/hex-2024-panacea/Panacea-Frontend.svg?style=for-the-badge
[issues-url]: https://github.com/hex-2024-panacea/Panacea-Frontend/issues


[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[AntDesign.com]: https://img.shields.io/badge/-Ant%20Design-333333?style=for-the-badge&logo=ant-design&logoColor=0170FE
[AntDesign-url]: https://ant.design/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Zustand]: https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[Zustand-url]: https://docs.pmnd.rs/zustand/
