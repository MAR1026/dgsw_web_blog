package kr.hs.dgsw.board_back.Controller;

import kr.hs.dgsw.board_back.Domain.User;
import kr.hs.dgsw.board_back.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/users")
    public List users() {
        return this.userService.findAll();
    }

    @GetMapping(value = "/search/{id}")
    public User user(@PathVariable Long id) {
        return this.userService.findById(id);
    }

    @PostMapping(value = "/login")
    public User login(@RequestBody User user) {
        return this.userService.findByAccountAndPassword(user);}

    @PostMapping(value = "/add")
    public Long add(@RequestBody User user) {
        return this.userService.add(user);
    }

    @PutMapping(value = "/modify")
    public Long modify(@RequestBody User user) {
        System.out.println(user.getId() + ", " + user.getAccount());
        return this.userService.modify(user);
    }

    @DeleteMapping(value = "/delete/{id}")
    public int delete(@PathVariable Long id) {
        return this.userService.deleteById(id);
    }
}
