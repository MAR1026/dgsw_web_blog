package kr.hs.dgsw.board_back.Controller;

import kr.hs.dgsw.board_back.Service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    private UserService userService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @GetMapping("/list")
    public List list() {

        @Getter
        class TmpBoard {
            int id;
            String author;
            String title;
            LocalDateTime created;

            TmpBoard(int id, String author, String title, LocalDateTime created) {
                this.id = id;
                this.author = author;
                this.title = title;
                this.created = created;
            }
        }

        List<TmpBoard> list = new ArrayList();
        list.add(new TmpBoard(1, "작성자1", "제목1", LocalDateTime.now()));
        return list;
    }


    @GetMapping(value = "/users")
    public List users() {
        return this.userService.findAll();
    }
}
