import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Pages/LayOut/LayOut";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import DetailsProduct from "./Pages/DetailsProduct/DetailsProduct";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Brands from "./Pages/Brands/Brands";
import Categories from "./Pages/Categories/Categories";
import Wishlist from "./Pages/Wishlist/Wishlist";
import WishContextProvider from "./Context/WishContext";
import AllOrders from "./Pages/AllOrders/AllOrders";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";


function App() {
  const queryClient = new QueryClient()
  const routers = createBrowserRouter([
    {
      path: "ecommerce/",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>

          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <DetailsProduct />
            </ProtectedRoute>

          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>

          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>

          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>

          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>

          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>

          ),
        },
        {
          path: "forget-password",
          element: (
              <ForgetPassword />
          ),
        },
        {
          path: "verify-code",
          element: (
              <VerifyCode />
          ),
        },
        {
          path: "reset-password",
          element: (
              <ResetPassword />
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>

          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (

    <WishContextProvider>
       <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <Toaster />
            <CounterContextProvider>
              <RouterProvider router={routers}></RouterProvider>
            </CounterContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </CartContextProvider>
     </WishContextProvider>
  );
}

export default App;
