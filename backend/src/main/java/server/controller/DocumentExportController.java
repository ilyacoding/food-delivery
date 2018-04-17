package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import server.service.*;

@Controller
@RequestMapping(value = "/docs")
public class DocumentExportController {

    @Autowired
    private UserService userService;

    @Autowired
    private MenuService menuService;

    @Autowired
    private UserOrderService userOrderService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private DurationTimeService durationTimeService;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public String userDocuments(Model model) throws Exception {
        model.addAttribute("documentType", "users");
        model.addAttribute("users", userService.findAll());
        return "";
    }

    @RequestMapping(value = "/menus", method = RequestMethod.GET)
    public String menuDocuments(Model model) throws Exception {
        model.addAttribute("documentType", "menus");
        model.addAttribute("menus", menuService.findAll());
        return "";
    }

    @RequestMapping(value = "/user_orders", method = RequestMethod.GET)
    public String ordersDocuments(Model model) throws Exception {
        model.addAttribute("documentType", "user_orders");
        model.addAttribute("user_orders", userOrderService.findAll());
        return "";
    }

    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    public String categoriesDocuments(Model model) throws Exception {
        model.addAttribute("documentType", "categories");
        model.addAttribute("categories", categoryService.findAll());
        return "";
    }

    @RequestMapping(value = "/duration_time", method = RequestMethod.GET)
    public String durationTimeDocuments(Model model) throws Exception {
        model.addAttribute("documentType", "duration_time");
        model.addAttribute("duration_time", durationTimeService.findAll());
        return "";
    }
}
