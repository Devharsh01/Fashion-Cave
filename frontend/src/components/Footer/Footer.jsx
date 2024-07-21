import React from "react";
import './Footer.css'
import InstagramIcon from '../Assets/instagram'
import WhatsappIcon from '../Assets/whatsapp'
import GmailIcon from '../Assets/gmail'

const Footer = () => {
    return ( 
        <div className="footer" id='footer'>
            <div className="footer-details">
                <div className="footer-left">
                    <h1>Crafted for Comfort,</h1>
                    <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Coveted for Class</h1>
                </div>
                <div className="footer-right">
                    <h3>Contact Us</h3>
                    <div className="footer-info">
                        <div className="footer-infoLeft">
                            <p>Name: </p>
                            <p>Mobile: </p>
                            <p>E-mail: </p>
                        </div>
                        <div className="footer-infoRight">
                            <p>&nbsp;Fashion Cave</p>
                            <p>&nbsp;+91 9412648136</p>
                            <p>&nbsp;fashioncave@gmail.com</p>
                        </div>
                        
                    </div>
                    <div className="footer-icons">    
                        <a className="instagram" href="https://wa.me/9412563154" target="_blank" rel="noopener noreferrer">
                            <WhatsappIcon className="whatsapp"/>
                        </a>
                        <a className="instagram" href="https://www.instagram.com/fashion_cave_01" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon/>
                        </a>
                        <a className="gmail" href="mailto:support@fashioncave.com" target="_blank" rel="noopener noreferrer">
                            <GmailIcon/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer