import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import data from '../assets/Data/HomeData.json';
import '../Styles/HomeScreen.css';
import DropdownMenu from '../Components/DropdownMenu';

function HomeScreen() {
  
  return (
    <>
    <DropdownMenu/>
    </>
  );
}
export default HomeScreen;
