package kr.hs.dgsw.board_back.Service;

import kr.hs.dgsw.board_back.Domain.User;

import java.util.List;

public interface UserService {

    List<User> findAll();
    int deleteById(Long id);
    Long add(User user);
    Long modify(User user);
    User findById(Long id);
    User findByAccountAndPassword(User user);

}
