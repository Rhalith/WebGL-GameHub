package web_server.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;
@Data
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;
    @Indexed
    private String username;
    private String password;
    private String role;
}

