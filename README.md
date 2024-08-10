# KE-Commerce
## _An Ecommerce built with React, Tailwind, MongoDB & NodeJS_



## Features

- MERN Stack
- UI Components from ShadCN
- Integrated PayPal Payment Portal

## Installation

KE-Commerce requires [Node.js](https://nodejs.org/) v20 to run.
It also requires [MongoDB](https://www.mongodb.com/products/platform/atlas-database).



Clone the project. Either use ssh or https

```sh
git clone https://github.com/kausik10/e-commerce.git
```
`OR`
```sh
git clone git@github.com:kausik10/e-commerce.git
```

Install the dependencies and devDependencies.

```sh
cd e-commerce/frontend
pnpm i
cd ..
cd backend
pnpm i
```

Don't forget to create a `.env file` in your backend folder & follow the instructions from `example.env` file.

Run the project. You will need two terminal tabs to run frontend and backend separately.
```sh
cd frontend
pnpm dev
```
Your `frontend` should be running by default in `localhost:3000/`

`Ctrl + Shift + T` to open new terminal tab.

Navigate where you are. using the command `pwd`.

By default you should be in `frontend` folder. Assuming you are using `bash`

```sh
cd ..
cd backend
pnpm dev
```

If you are succesfully able to run the project you should see a message saying

`Server is running at http://localhost:4000. Connected to MongoDB`

`Will update soon for the production environments`


## Development

Want to contribute? Great!

KE-Commerce uses TypeScript, React, Tailwind, Node.JS, Express.JS and MongoDB.
If you want to make contributions, here is what further needs to be done. 

* Adding Mobile Responsiveness in `ShippingPage` `OrderPage` `OrderHistoryPage` `PaymentPage`
* In many Pages, Certain `div` patterns are repeated. It would be awesome to create some custom components and implement those functionality.
* Currently the products are fetched from `backend` folder. It would be great to fetch products from `APIs` such as `Amazon` or `Daraz`
* The `error` pages are not built properly. It is of high priority.
* Certain design patterns are altered when swithcing from `light` to `dark` mode (From `ShadCN UI`).
Open your favorite Terminal and run these commands.



## License

GNU

**Free Software, Hell Yeah!**


