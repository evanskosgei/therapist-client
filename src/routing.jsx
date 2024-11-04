/* eslint-disable no-unused-vars */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './AuthPages/signin'
import SignUp from './AuthPages/signup'
import Verify_email from './AuthPages/verify_email'
import ForgotPassword from './AuthPages/forgot_password'
import ResetPassword from './AuthPages/reset_password'

import Layout from './pages/layout'
import Dashboard from './pages/dashboard'
import Session from './pages/session/session'
import BookSession from './pages/session/book_session'
import Check_out_session from './pages/session/check_out_session'
import CommunityLayout from './pages/communities/community_layout'
import BuyArticle_layout from './pages/buy_article/buyArticle_layout'

import BalanceLayout from './pages/balance/balance_layout'
import SettingsLayout from './pages/settings/settings_layout'

const Routing = () => {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/verification' element={<Verify_email />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/home' element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path='session' element={<Session />} />
                <Route path='book-session' element={<BookSession />} />
                <Route path='check-session/:id' element={<Check_out_session />} />
                <Route path='communities' element={<CommunityLayout />} />
                <Route path='buy-article' element={<BuyArticle_layout />} />
                <Route path='balance' element={<BalanceLayout />} />
                <Route path='settings' element={<SettingsLayout />} />
            </Route>
        </Routes>
    )
}

export default Routing;