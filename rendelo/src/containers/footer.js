import React from 'react';
import Footer from '../Komponensek/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

export function FooterContainer() {
    const currentYear = new Date().getFullYear();
    return (
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column>
                        <Footer.Title>Rólunk</Footer.Title>
                        <Footer.Link href="#">Történet</Footer.Link>
                        <Footer.Link href="#">Ügyfelek</Footer.Link>
                        <Footer.Link href="#">Ajánlások</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Szolgáltatások</Footer.Title>
                        <Footer.Link href="#">Termékek böngészése</Footer.Link>
                        <Footer.Link href="#">Gyors kiszállítás</Footer.Link>
                        <Footer.Link href="#">Kedvező árak</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Kapcsolat</Footer.Title>
                        <Footer.Link href="#">Magyarország</Footer.Link>
                        <Footer.Link href="#">Szlovákia</Footer.Link>
                        <Footer.Link href="#">Támogatás</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Közösségi</Footer.Title>
                        <Footer.Link href="#"><FontAwesomeIcon icon={faFacebook} /> Facebook</Footer.Link>
                        <Footer.Link href="#"><FontAwesomeIcon icon={faInstagram} /> Instagram</Footer.Link>
                        <Footer.Link href="#"><FontAwesomeIcon icon={faYoutube} /> Youtube</Footer.Link>
                        <Footer.Link href="#"><FontAwesomeIcon icon={faTwitter} /> Twitter</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                    <Footer.Text>{currentYear} @FoodRapid Minden jog fenntartva!</Footer.Text>
                    </Footer.Column>
                </Footer.Row>
            </Footer.Wrapper>
            
        </Footer>
    );
}
