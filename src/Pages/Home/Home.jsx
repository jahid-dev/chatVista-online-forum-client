import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/Header/HeroSection/HeroSection";
import { NavBar } from "../../components/Header/Navbar/Navbar";
import MainSection from "../../components/MainSection/MainSection";

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
            <HeroSection></HeroSection>
            <MainSection></MainSection>
            <Footer></Footer>

        </div>

    );
};

export default Home;