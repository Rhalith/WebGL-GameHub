package web_server.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service

public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public Review createReview(String content,String gameId){
        Review review = new Review(content);
        reviewRepository.insert(review);
        mongoTemplate.update(Game.class).matching(Criteria.where("gameId").is(gameId))
                .apply(new Update().push("reviewIds").value(review))
                .first();
        return review;
    }
}
