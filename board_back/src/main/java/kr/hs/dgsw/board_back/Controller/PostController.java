package kr.hs.dgsw.board_back.Controller;

import kr.hs.dgsw.board_back.Domain.Post;
import kr.hs.dgsw.board_back.Domain.User;
import kr.hs.dgsw.board_back.Service.PostService;
import kr.hs.dgsw.board_back.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping(value = "/posts")
    public List posts() {
        return this.postService.findAll();
    }

    @GetMapping(value = "/search/{id}")
    public Post post(@PathVariable Long id) {
        return this.postService.findById(id);
    }

    @GetMapping(value = "/findbyuserid/{userid}")
    public List postByUserID(@PathVariable Long userId) {
        return this.postService.findByUserId(userId);
    }

    @PostMapping(value = "/add")
    public Long add(@RequestBody Post post) {
        return this.postService.add(post);
    }

    @PostMapping(value = "/addwithhashmap")
    public Long addWithHashmap(@RequestBody Post post) {
        return this.postService.addWithHashmap(post);
    }

    @PutMapping(value = "/modify")
    public int modify(@RequestBody Post post) {
        return this.postService.modify(post);
    }

    @DeleteMapping(value = "/delete/{id}")
    public int delete(@PathVariable Long id) {
        return this.postService.deleteById(id);
    }
}
