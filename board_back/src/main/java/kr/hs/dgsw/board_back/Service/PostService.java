package kr.hs.dgsw.board_back.Service;

import kr.hs.dgsw.board_back.Domain.Post;

import java.util.HashMap;
import java.util.List;

public interface PostService {
    List<Post> findAll();
    Post findById(Long id);
    Long add(Post post);
    int modify(Post post);
    int deleteById(Long id);
    List<Post> findByUserId(Long userId);
    Long addWithHashmap(Post post);
}
