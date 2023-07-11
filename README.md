<br>
<p align="center">
    <img src="https://user-images.githubusercontent.com/62269745/174906065-7bb63e14-879a-4740-849c-0821697aeec2.png#gh-light-mode-only" width="40%">
</p>

<h1> Point Of Sale System</h1>
<br>

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Overview

This project is a web-based point-of-sale system (POS) designed for use in supermarkets. The app provides a user-friendly interface that allows supermarkets to add products to a cart and calculate the total amount for the order.

With this system, supermarkets can keep track of their inventory, manage customer orders, and process payments more efficiently. The app is designed to be intuitive and easy to use, making it an ideal solution for businesses of all sizes.

The POS system is built using modern web technologies, ensuring that it is fast, reliable, and scalable. Overall, this project aims to simplify the process of managing customer orders and streamlining the checkout process for supermarkets.

NOTE: This system is implemented for both Frontend and Backend. So in order for this to work flawlessly you will have to download the Backend from here
https://github.com/Aamer-Qanadilo/POS-Backend

Read the documentation there to open it.

## Technologies

<p align="center">
<img alt="React" src="https://user-images.githubusercontent.com/62269745/151359683-6602ec17-a473-43a5-b7e7-866d8194c959.svg" height="40" width="40" />
<img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" alt="typescript" height="40"  width="40" />
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/07052867-75aa-4b3d-8fc9-24b8707c1c43" alt="material ui" height="40" width="40" />
<img src="https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png" alt="formik" height="40" width="40" />   
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/a9084df8-227a-436e-9411-7fa359f47955" alt="lodash" height="40" width="40" />   

</p>

- [React](https://reactjs.org/): JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript with static typing
- [NodeJS Backend](https://nodejs.org/en): Node.js® is an open-source, cross-platform JavaScript runtime environment.
- [Formik](https://formik.org/): A form library for React that simplifies form management
- [Lodash](https://lodash.com/): A modern JavaScript utility library delivering modularity, performance & extras.
- [React-router](https://reactrouter.com/): A declarative routing library for React that handles client-side routing

## Installation

To run this project on your local machine, follow these steps:

<ol>
  <li>
    First you will need to clone the Backend side, please cheek the link https://github.com/Aamer-Qanadilo/POS-Backend
  </li>
  <li>
    then you need to open the command line
  </li>
  <li>Clone the repository to your local machine:
    <pre><code>git clone https://github.com/Aamer-Qanadilo/POS-Frontend.git </code></pre>
  </li>
  <li>Install the dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Start the development server:
    <pre><code>npm start</code></pre>
  </li>
</ol>

## Usage

Welcome to my React project's user guide! This project includes several pages to help manage your product inventory and sales. Below is a brief overview of each page and its functionality.

 <h4>Login Page:</h4>
The login page allows authorized users to access the other pages in the system. Users can enter their email and password to log in.
<br/>
<br/>
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/b81e2992-9309-46bd-8dc5-7b50ad4fd332" alt="login page image"  width="100%" />
<br/>
<br/>

<h4>Register Page:</h4>
This page allows users to register for new account.<br/>
After completing the form, a confirmation email will be sent to the main admin of this website.
<br/>
<br/>
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/52c626cd-4922-4a80-a840-95e9be526dce" alt="register page image"  width="100%" />
<br/>
<br/>


<h4>Forget Password Page:</h4>
This page allows users to send a code to their email so they can reset their password.
<br/>
<br/>
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/839dcfc4-2b94-4861-9dd7-e273b3d0b323" alt="forget password page image"  width="100%" />
<br/>
<br/>

<h4>Reset Password Page:</h4>
After the previous step, we will get an email like this <br /> 
<p align="center">
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/081348fb-ccb2-446d-8e58-ede15f56da11" alt="forget password email template"  width="75%" />
</p>
Which we can use to reset our password here <br />
<p align="center">
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/516205f8-34d5-4038-9453-7ac3b0900de4" alt="reset password page image"  width="75%" />
</p>


<h4>Products Page:</h4>
On this page, you can view, add, update, and delete products from the backends' database. <br/>
It displays a table of all products with details such as name, price, quantity and the date it has been modified on. <br />
You can use pagination and even decide the number of products shown per page. <br/>
Also you can use the search box to filter the products by name or code. <br />
Also you can sort the products ascending/descending by clicking at the tables' header. <br />
And finally, you have the FILTERS buttons which shows you the categories that you can use to filter the products. <br/>

<p align="center">
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/70f9d368-179e-40b6-b9e5-a64355ff833a" alt="products page image"  width="80%" />
</p>

<h4>Categories Page:</h4>
On this page, you can view, add, update, and delete categories from the backends' database. <br/>
It displays a table of all categories with details such as name, image and the date it has been created and modified on. <br />
You can use pagination and even decide the number of categories shown per page. <br/>
Also you can use the search box to filter the categories by name. <br />
And finally, you can sort the categories ascending/descending by clicking at the tables' header. <br />

<p align="center">
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/8a8731ff-7ebe-4515-92de-1069d0f625ca" alt="categories page image"  width="80%" />
</p>

<h4>Units Page:</h4>
On this page, you can view, add, update, and delete units from the backends' database. <br/>
It displays a table of all units with details such as name, baseUnit, conversion factor and the date it has been created and modified on. <br />
You can use pagination and even decide the number of units shown per page. <br/>
Also you can use the search box to filter the units by name. <br />
And finally, you can sort the units ascending/descending by clicking at the tables' header. <br />

<p align="center">
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/8c96535a-d0a5-4d4c-a0cc-17c04541e382" alt="units page image"  width="80%" />
</p>


<h4>
Cashier Page (POS Page):</h4>
The POS (point of sale) page is designed to help cashiers check out customers. <br />
The page displays a list of all products that are searchable and filterable by product category. <br />
You can start a new cart checkout, add products to the cart, change the quantity of added products, delete a product, edit the tax, apply a discount, and check out the cart. <br />
It also supports multi-cart system so that the cashier would easily handle more than 1 cart at the same time.

<p align="center">
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/654609b2-f6dc-4a03-9d89-7678ec122d75" alt="cashier page image"  width="80%" />
</p>

<p align="center">
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/b9c52362-6031-41ce-8578-96fa86b49009" alt="cashier page image - no chosen cart case"  width="80%" />
</p>

<p align="center">
<img src="https://github.com/Aamer-Qanadilo/POS-Frontend/assets/104656644/eb57aafa-2f40-4938-aede-68ba0a0a018d" alt="cashier page image - no items added"  width="80%" />
</p>

<br><br>
Thank you for using my React project! If you have any questions or issues, please contact me.


 <h2>Notes</h2>
 <p> This project is a part of the <a href="https://www.foothillsolutions.com/">Foothill Solutions<a/>  internship program.<p>
