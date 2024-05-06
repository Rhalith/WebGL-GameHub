package web_server.project;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/games")
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
    }
}
