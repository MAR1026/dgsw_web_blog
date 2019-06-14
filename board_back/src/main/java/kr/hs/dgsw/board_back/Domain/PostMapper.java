package kr.hs.dgsw.board_back.Domain;


import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface PostMapper {

    List<Post> findAll();
    Post findById(Long id);
    Long add(Post post);
    int modify(Post post);
    int deleteById(Long id);
    List<Post> findByUserId(Long userId);
    Long addWithHashmap(HashMap<String, Object> map);
}
