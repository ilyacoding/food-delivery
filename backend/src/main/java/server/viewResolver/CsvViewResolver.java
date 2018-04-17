package server.viewResolver;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import server.view.CsvView;

import java.util.Locale;

public class CsvViewResolver implements ViewResolver {
    @Override
    public View resolveViewName(String s, Locale locale) throws Exception {
        CsvView view = new CsvView();
        return view;
    }
}
