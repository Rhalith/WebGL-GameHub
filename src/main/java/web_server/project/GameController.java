package web_server.project;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    private GameService gameService;
    @GetMapping
    public ResponseEntity<List<Game>> allGames(){
        return new ResponseEntity<List<Game>>(gameService.getAllGames(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Game>> getGameById(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<Game>>(gameService.gameById(id),HttpStatus.OK);
    }@GetMapping("/genre/{genre}")
    public ResponseEntity<List<Game>> getGamesByGenre(@PathVariable String genre) {
        return new ResponseEntity<>(gameService.findGamesByGenre(genre), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGameById(@PathVariable ObjectId id) {
        gameService.deleteGameById(id);
        return new ResponseEntity<>("Oyun başarıyla silindi", HttpStatus.OK);
    }

}
