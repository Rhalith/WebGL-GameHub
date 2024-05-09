import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const Hero = ({games}) => {
    return (
        <div className="game-carousel-container">
           <Carousel> 
            {
                games.map((game) => {
                    return (
                        <Paper>
                            <div className="game-card.container">
                                <div className="game-card">
                                    <div className="game-detail">
                                        <div className="game-poster">
                                            <img src={game.poster} alt="" />
                                        </div>
                                        <div className="game-name">
                                            <h4>{game.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                })
            }
           </Carousel>
        </div>
    );
}

export default Hero;