## Steps to view the app:

### Case 1 - TA has an iphone or android phone -
Download the expo Go application from the App store or Google play store.
Use the following email and password to login:
- #### Email: csc301.a2.pair.74@gmail.com
- #### Password: csc301anshnazanin
Open the below link :
#### https://expo.dev/@pair_74/cost-calculator?serviceType=classic&distribution=expo-go 
Scan the barcode on your mobile device(where you downloaded expo go and logged in with above info) and it will redirect you to the Expo App.

### Case 2 - TA has a simulator and wants to run the App locally on their laptop.
Git clone the repository
See that the simulator is connected and running.
Open terminal on the folder the repo is cloned locally and run the below commands -
Run - npm install
Run - expo start --ios or  expo start --android (depending on your simulator)
This will automatically load the App on your simulator.

## Frontend: 

For our mobile App design, we initially considered three options Vue, Swift, and React Native. After doing research, we decided to use React Native for our Frontend.
This framework is based on JavaScript and since we both had prior experience with this programming language, it seemed like an easier option for app development. As JavaScript components are built on iOS and Android components, our workload got much less without needing to create the same app on another platform. As a result of this reusability feature, our checkout price calculator works for both IOS and Android with high development speed and considerable efficiency. Furthermore, the live reload feature of React Native helped us to work with the application and see the changes and fixes in real-time. We also tried to import material-UI framework, which could be helpful and time saving in rendering components. However, there were dependency issues between running material-UI and Expo together. Overall, React Native is the one of the most popular frameworks used in industry such as Instagram, Facebook, Discord and many more and seemed the best option for us.
By using JSX in this relatively simple app, we were able to write elements. However, the number of custom modules available is limited and for a more complex app, we have to build them from scratch ourselves.

Components in Vue Applications/web pages can be written using JavaScript and CSS which are good choices due to our prior experience with them. However, for our application which was aimed to have multiple screens, Vue was not the best solution since it’s mostly used for single-page apps and offers a smaller number of components and libraries, which could make our work harder.
Swift was another option for us to consider since its main purpose is to develop apps for IOS. Although its syntax is fairly simple, it was still unfamiliar to us. Moreover, this programming language is fairly new and the official IDE of Apple, XCode, lags in terms of tooling and support for Swift. Therefore, it would become a challenge to view the App’s performance after developing it.  


## Backend:

We implemented the CRUD stack in the backend to meet the feature requirements. Along with it we also used higher-order components of React-Native. Higher-order functions in JavaScript take some functions as arguments and return another function. We will be using functions like forEach, Map, Reduce and Filter. Higher order components (HOC) in React help us reuse the logic. The aim would be to have HOCs design components with certain shared behavior in a way that makes them connected differently than normal state-to-props patterns. A few main examples of HOCs we are going to implement are react-navigation and react-native-root-toast. We also used hooks to manage the Context API of the Application by using the following useContext, useState, useEffect. Context offers an alternative to manually passing props down at each level to pass data through the component tree. This helped us create an array of Cart items which was updated on different screens and passed from one screen to another, helping us implement features like add/remove, and increase the quantity. 

The alternative option was react-redux. A JavaScript library called Redux methods in centrally controlling data flow. It keeps track of the entire application state. The requirements of this App did not require redux and were easily implemented by Context API. Redux would be a better option if we had multiple users using the app and also if we had a lot of screens and components. Redux cannot wrappe a lot of components so in that case Redux should be implemented.

## Database:

Our database contained products, provinces, and discounts, each with their fields as key-value pairs. We examined the pros and cons of Firebase, MangoDB, and mySQL and picked Firebase.
Firebase is a noSQL database and it didn’t require programming for adding rows and columns and was more efficient for our small amount of data. It gave us more flexibility in using the format which fit our data the best. Considering our choice for frontEnd, React Native, firebase was the best choice since it can be easily integrated using a few commands and configurations. ​​This is due to react-native-firebase library which is a collection of packages that brings React Native support for all Firebase services on both Android and iOS apps. However, if our data was more complex, firebase could result in more issues regarding data migration and complex queries.
Similar to Firebase, mangoDB is a document-oriented database. In firebase, adding data required putting objects by only using + sign. However, in mangoDb, this process requires writing schema for each object in our database and it could become cumbersome in terms of writing code. Also, MangoDB is not supported by expo which would be a great issue since we’re using expo to open our application.
Lastly, mySQL is highly compatible with the React Native local database but is highly preferred to store larger data and would make our job unnecessarily complicated since we are working with small data. 


## Deployment and viewing the app: 

For the purpose of deployment we had no prior experience, we started by trying to deploy on netlify, vercel and heroku by connecting the git repo. Later we found out that those only support web apps. We were able to build successfully on Expo but found out we need a paid account to deploy on the App store or Google play store. Finally we decided to take advantage of the expo share project access. We published the app on Expo that generated a link and barcode to share our App with everyone that has been granted access. Below are the  steps to view and test the app. We have also made a video demonstration to show features of the App.


## Description of what our app does:

Once the application is opened, a list of all products, each with their name, information, price, size (if applicable), and  `Add to Cart` button is displayed. Once the user starts selecting items, `Go to Cart` button with the number of total items in the cart is displayed at the top-right corner of the page. The user can add or remove as many items as they like by either pressing `+` or `-` buttons. By selecting `Go to Cart`, the user is redirected to the next page, where they can remove any items they don’t like, select province, and discount code (if any). The prices such as shipping, discount, tax, and total are shown at the bottom of the page. If the user wishes to checkout, they can press `Place Order` to redirect to the order summary page. Once this order is completed, a new order can be placed and the cart is reloaded.

## Unit Tests:
Our unit test runs Jest to ensure that the app is navigated to the right screen once a button is pressed. These include redirecting to the Cart page after the  `Go to Cart` button is pressed, to Order Summary page after `Place Order` is pressed, to Cart Page again after `Remove` button is pressed, and to Main page after `Start a new order` is pressed. Using the `npm test` command, our unit test is run and the tests pass, showing each navigation to a screen was successful. The unit test is found in screens/__tests__.
