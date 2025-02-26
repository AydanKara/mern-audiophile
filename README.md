# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

Audiophile is a cutting-edge e-commerce platform developed as a Single Page Application (SPA) using React.js, dedicated to offering an unparalleled online shopping experience for high-end audio enthusiasts.
<br>

## Table of Contents

| Section | Subsection | Description |
|---------|------------|-------------|
| [Overview](#overview) |  | General project information |
|  | [The Challenge](#-the-challenge) | Problems solved in this project |
|  | [Screenshots](#-screenshots) | Preview of the application |
|  | [Links](#-links) | Useful links related to the project |
| [My Process](#my-process) |  | Development approach |
|  | [Built With](#%EF%B8%8F-built-with) | Technologies and tools used |
|  | [What I learned](#-what-i-learned) | Some of major learnings while working through this project |
|  | [Continued development](#-continued-development) | Outlining areas to continue to focus on in future projects |
|  | [Useful Resources](#-useful-resources) | References that helped in development |
| [Author](#-author) |  | About the creator of the project |
| [Acknowledgments](#-acknowledgments) | | Giving advice to someone who helped bei developing the project |

## Overview

### 🚀 The Challenge  

👤 Users should be able to:  

✅ **Responsive Design:** View the **optimal layout** for the app depending on their device's screen size 📱💻  

🎨 **Interactive Elements:** See **hover states** for all interactive elements on the page 🖱️✨  

🛒 **Cart Management:**  
    ✔️ Add/Remove products from the cart ➕➖  
    ✔️ Edit product quantities in the cart 🔄  

📝 **Checkout Process:**  
    ✔️ Fill in all fields in the **checkout form** ✅✍️  
    ✔️ Receive **form validations** if fields are missed or incorrect during checkout ⚠️🔍  

💰 **Pricing Calculations:**  
   ✔️ See correct **checkout totals** depending on the products in the cart 🧾💵  
   ✔️ **Shipping Fee:** Always adds **$50** to the order 🚚💲  
   ✔️ **VAT:** Calculated as **20%** of the total product cost (excluding shipping) 🏦📊  

🎉 **Order Confirmation:**  
   ✔️ See an **order confirmation modal** after checking out with a summary of the order ✅📦  

⭐ **Bonus Feature:**  
   ✔️ Keep track of items in the cart, even after refreshing the browser 🔄🛍️  
   ✔️ (_Tip:_ `localStorage` can be used if you're not building a full-stack app) 💾  

### 📸 Screenshots

#### 🏠 Homepage  

![](/client/public/homepage-screens.png)
_A modern, clean homepage showcasing featured products._

#### 🛒 Shopping Cart | 💳 Checkout Page | 🎉 Order Confirmation
![](/client/public/cart-checkout-confirmation.png)  
_Users can easily add, remove, or modify product quantities._
_An optimized, user-friendly checkout process._

### 🌐 Links

- Solution URL: [Solution URL](https://www.frontendmentor.io/solutions/audiophile-ecommerce-website-YThLM4cqLx)
- Live Site URL: [Audiophile](https://mern-audiophile.vercel.app/)

## My process

### 🛠️ Built With  

#### 🎨 Frontend  
- ⚛️ **[React](https://reactjs.org/)** – JavaScript library for building UI components
- **[React-Redux]()** - Official React UI bindings layer for Redux.
- 🎭 **[Ant Design](https://ant.design/)** – UI framework 
- 🏗️ **Semantic HTML5** – Properly structured markup  
- 🎨 **CSS & Custom Properties** – Styling and layout  
- 📏 **Flexbox & Grid** – For responsive design  

#### 🖥️ Backend  
- 🚀 **[Node.js](https://nodejs.org/)** – JavaScript runtime for backend development  
- ⚡ **[Express.js](https://expressjs.com/)** – Fast and minimalist web framework  
- 🗄️ **[MongoDB](https://www.mongodb.com/)** – NoSQL database for data storage  
- 🔑 **[JWT (JSON Web Tokens)](https://jwt.io/)** – Secure authentication & authorization  

### 📚 What I Learned  

Throughout this project, I gained valuable insights into frontend and backend development. Here are some key takeaways:  

#### 🎨 **Frontend Insights**  

- **Efficient State Management in React with Redux Toolkit**: Used React's state and hooks to manage UI changes dynamically.
- **Working on dynamic routing**
- **Integrating third-party APIs like Google OAuth**
- **Ant Design for Admin Pages**: Learned to customize **Ant Design components** for a smooth UI experience.  

Example: Implementing an **Ant Design Table** with dynamic data fetching:  
```jsx
import { Table, Spin } from 'antd';

const columns = [
  {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imgSrc) => (
        <td data-label="Image">
          <img src={imgSrc} alt="Product Image" width={100} />
        </td>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <td data-label="Name">
          <strong>{text}</strong>
        </td>
      ),
    },
    ...
];

  return (
    <Spin spinning={loading}>
      <h2 style={{textAlign: "center", paddingBottom: "2rem"}}>Products</h2>
      <Table
        className="container"
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
      />
    </Spin>
  );
```

🖥️ Backend Lessons
  - 🔐 Authentication with JWT: Implemented secure user authentication using JSON Web Tokens.
  - 🗃️ MongoDB & Express: Learned how to structure APIs efficiently and optimize database queries.

Example: Generating a JWT token for authentication:
```js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false, // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
```

🔗 Full-Stack Integration
  - 🔄 Connecting React with Express API: Managed API requests effectively.
  - ⚔️ Handling Protected Routes: Restricted access to certain pages using authentication.

Example: Protecting routes in React Router:
```jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthGuard() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

```

##### 💡 Final Thoughts
  - This project reinforced my understanding of React, Node.js, Express, and MongoDB while also improving my ability to manage state and handle authentication.

### 🔄 Continued Development  

As I continue improving my skills, there are several areas I want to focus on in future projects:  

#### ⚛️ **React & Redux for State Management**  

- Implement **React-Redux** more efficiently for **managing global state**.  
- Improve **asynchronous data fetching** with **Redux Toolkit & RTK Query**.
  
#### 🌐 Backend Deployment Challenges

  - I encountered difficulties deploying the backend, and I want to refine my deployment process.
  - Focus areas:
      - Hosting Node.js & Express on platforms like Vercel, Render, or DigitalOcean.
      - Environment variable management to keep API keys secure.
      - Database scaling & optimization with MongoDB Atlas.

#### ⚡ Performance Optimization
  - Implement lazy loading & code splitting in React.
  - Optimize database queries with MongoDB indexes and aggregation pipelines.
  - Improve backend error handling & logging with Winston & Morgan.

#### 🚀 Final Thoughts
  - **These areas will be my focus in upcoming projects to enhance my full-stack development skills. I’m particularly excited to refine my Redux data management, backend deployment strategies, and performance optimization techniques!**

### 📚 Useful Resources  

Here are some great resources that helped me during the development of this project:  

🔹 *Documentation & Development Guides*
- 🔗 **[React-Redux Documentation](https://redux.js.org/)** – The official guide to understanding **Redux state management**.  
- 🚀 **[Vercel Deployment Guide](https://vercel.com/docs/)** – Helped me successfully deploy my frontend and backend.  
- 🛠️ **[MongoDB Aggregation Guide](https://www.mongodb.com/docs/manual/aggregation/)** – Explained how to optimize **database queries** for performance.  
- 📝 **[Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)** – A collection of **best practices for writing clean and scalable Node.js applications**.

🔹 *Courses & Video Tutorials*
- 🎥 **[Full stack MERN Real Estate App - Dr. Sahand Ghavidel (Udemy)](https://www.udemy.com/course/full-stack-mern-real-estate-app/)**
  - This course provided in-depth knowledge on building a full-stack platform using React, Node.js, Express, and MongoDB. The explanations were clear, and the hands-on approach helped me understand real-world project development.
- 🎥 **[MERN From Scratch 2023 | eCommerce Platform – Brad Traversy (Udemy)](https://www.udemy.com/course/mern-ecommerce/)**
  - Brad Traversy’s course helped me refine my understanding of the MERN stack and build an eCommerce platform from scratch. His teaching style and practical examples made it easy to follow along and apply concepts effectively.

🔹 *Educational Institution*

- [👨‍🎓 SoftUni](https://softuni.bg/)
  - This project was prepared during my studies at SoftUni, Bulgaria’s largest and most respected IT education institution. SoftUni provides extensive training and career assistance in software engineering, digital marketing, and design.

#### 💡 **Why these resources?**  
  - These guides and articles provided **invaluable insights** into handling **state management, optimizing performance, and deploying full-stack applications**. I highly recommend them to anyone working on similar projects!  



## 👨‍🎨 Author

- Website - [Aydan Karamehmed](https://github.com/AydanKara)
- Frontend Mentor - [@AydanKara](https://www.frontendmentor.io/profile/AydanKara)

## 🙏 Acknowledgments
I would like to express my gratitude to the following individuals and organizations for their guidance, inspiration, and support during this project:

  * 👨‍🎓 SoftUni – For providing a structured learning path in software development and shaping my journey as a full-stack developer.
  * 👨‍🏫 Dr. Sahand Ghavidel – For his excellent Full stack MERN Real Estate App with React & Node.js course, which provided valuable insights into building a complete MERN stack application.
  * 👨‍🏫 Brad Traversy – For his MERN From Scratch 2023 | eCommerce Platform course, which helped solidify my understanding of the stack and best practices.
  * 💡 Open-Source Contributors – A big thanks to the React, Redux, Node.js, MongoDB, and Express communities for their extensive documentation and open-source contributions.
  * 👨‍👩‍👦‍👦 Friends & Family – For their constant support, feedback, and encouragement throughout the development process.




