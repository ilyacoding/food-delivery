package server.viewResolver;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import server.view.XlsView;

import java.util.Locale;

public class XlsViewResolver implements ViewResolver {
    @Override
    public View resolveViewName(String s, Locale locale) throws Exception {
        XlsView view = new XlsView();
        return view;
    }
}