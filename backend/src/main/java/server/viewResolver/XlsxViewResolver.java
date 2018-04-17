package server.viewResolver;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import server.view.XlsxView;

import java.util.Locale;

public class XlsxViewResolver implements ViewResolver {
    @Override
    public View resolveViewName(String s, Locale locale) throws Exception {
        XlsxView view = new XlsxView();
        return view;
    }
}