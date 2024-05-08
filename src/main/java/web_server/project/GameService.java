package web_server.project;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;
    public List<Game> getAllGames(){
        return gameRepository.findAll();
    }
    public Optional<Game> gameById(ObjectId id){
        return gameRepository.findById(id);
    }
    public List<Game> findGamesByGenre(String genre) {
        return gameRepository.findByGenres(genre);
    }public void deleteGameById(ObjectId id) {
        gameRepository.deleteById(id);
    }
}
