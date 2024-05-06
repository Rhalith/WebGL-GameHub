package web_server.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
@Document(collection = "games")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Game {
    @Id
    private ObjectId id;
    private String gameId;
    private String name;
    private String description;
    private int like_count;
    private List<String> genres;
    private List<Review> reviewIds;
}
