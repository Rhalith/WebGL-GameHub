package web_server.project;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository  extends MongoRepository<Game, ObjectId> {
    @Query("{'genres': { $in: [ ?0 ] }}")
    List<Game> findByGenres(String genre);
    List<Game> findAllByOrderByLikeCountDesc();
    List<Game> findByName(String name);
    Optional<Game> findBygameId(String id);
 }
