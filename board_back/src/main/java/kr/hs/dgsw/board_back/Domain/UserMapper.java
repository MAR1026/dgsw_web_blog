package kr.hs.dgsw.board_back.Domain;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("select id, account, username, email, created, updated from user")
    public List<User> findAll();

    @Delete("delete from user where id=#{id}")
    public int deleteById(Long id);

    //@Insert("insert into user(account, password, username, email) " + "values(#{account}, #{password}, #{username}, #{email})")
    public Long add(User user);

    public Long modify(User user);
    public User findById(Long id);
    public User findByAccountAndPassword(User user);

}
