import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainScreen from '../MainScreen.js'
import CartScreen from '../CartScreen.js'
import OrderData from '../OrderData,js'

describe("Test main, cart, and order summary screens", () => {
    
    it("Should go to cart page after Go to Cart button is pressed", () =>{
        const navigation = {navigate: () => {}}
        spyOn(navigation, "navigate")
        const main_page = render(<MainScreen navigation={navigation}/>)
        const goToCartButton = main_page.getByTestId("goToCartButton")
        fireEvent.press(goToCartButton)
        expect(navigation.navigate).toHaveBeenCalledWith("Cart")

    })

    it("Should go to order summary after place order is pressed", () =>{
        const navigation = {navigate: () => {}}
        spyOn(navigation, "navigate")
        const cart_page = render(<CartScreen navigation={navigation}/>)
        const goToOrderButton = cart_page.getByTestId("goToOrderButton")
        fireEvent.press(goToOrderButton)
        expect(navigation.navigate).toHaveBeenCalledWith("Order")
    })

    it("Should go again to cart page after remove button is pressed", () =>{
        const navigation = {navigate: () => {}}
        spyOn(navigation, "navigate")
        const cart_page = render(<CartScreen navigation={navigation}/>)
        const removeButton = cart_page.getByTestId("removeButton")
        fireEvent.press(removeButton)
        expect(navigation.navigate).toHaveBeenCalledWith("Cart")
    })

    it("Should go to main page after start a new order is pressed", () =>{
        const navigation = {navigate: () => {}}
        spyOn(navigation, "navigate")
        const order_page = render(<OrderData navigation={navigation}/>)
        const startNewButton = order_page.getByTestId("startNewButton")
        fireEvent.press(startNewButton)
        expect(navigation.navigate).toHaveBeenCalledWith("Main")
    })
})