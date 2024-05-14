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

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> gameById(String id) {
        return gameRepository.findBygameId(id);
    }

    public List<Game> findGamesByGenre(String genre) {
        return gameRepository.findByGenres(genre);
    }

    public void deleteGameById(ObjectId id) {
        gameRepository.deleteById(id);
    }

    public List<Game> findGamesByHighestLikes() {
        return gameRepository.findAllByOrderByLikeCountDesc();
    }

    public List<Game> findGamesByName(String name) {
        return gameRepository.findByName(name);
    }

    public Game incrementLikeCount(String id) {
        Optional<Game> optionalGame = gameRepository.findBygameId(id);
        if (optionalGame.isPresent()) {
            Game game = optionalGame.get();
            game.setLikeCount(game.getLikeCount() + 1);
            return gameRepository.save(game);
        } else {
            throw new RuntimeException("Game not found");
        }
    }public Game decrementLikeCount(String id) {
        Optional<Game> optionalGame = gameRepository.findBygameId(id);
        if (optionalGame.isPresent()) {
            Game game = optionalGame.get();
            game.setLikeCount(game.getLikeCount() -1);
            return gameRepository.save(game);
        } else {
            throw new RuntimeException("Game not found");
        }
    }
}
