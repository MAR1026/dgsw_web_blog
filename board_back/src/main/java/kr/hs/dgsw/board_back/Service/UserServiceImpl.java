package kr.hs.dgsw.board_back.Service;

import kr.hs.dgsw.board_back.Domain.User;
import kr.hs.dgsw.board_back.Domain.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> findAll() {
        return this.userMapper.findAll();
    }

    @Override
    public int deleteById(Long id) {
        return this.userMapper.deleteById(id);
    }

    @Override
    public Long add(User user) {
        return this.userMapper.add(user);
    }

    @Override
    public Long modify(User user) {
        return this.userMapper.modify(user);
    }

    @Override
    public User findById(Long id) {
        return this.userMapper.findById(id);
    }

    @Override
    public User findByAccountAndPassword(User user) {
        return this.userMapper.findByAccountAndPassword(user);
    }
}
