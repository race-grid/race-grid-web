package racegrid.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import racegrid.web.model.IndexModel;
import racegrid.web.model.RaceGridProps;

@Controller
public class WebController {

    private final RaceGridProps props;

    @Autowired
    public WebController(RaceGridProps props) {
        this.props = props;
    }


    @RequestMapping("/")
    public String index(@ModelAttribute IndexModel model) {
        model.setApiUrl(props.getApiUrl());
        return "index";
    }

}
