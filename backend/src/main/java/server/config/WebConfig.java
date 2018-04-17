package server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import server.viewResolver.CsvViewResolver;
import server.viewResolver.PdfViewResolver;
import server.viewResolver.XlsViewResolver;
import server.viewResolver.XlsxViewResolver;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer
                .defaultContentType(MediaType.APPLICATION_JSON)
                .favorPathExtension(true);
    }

    @Bean
    public ViewResolver contentNegotiatingViewResolver(ContentNegotiationManager manager) {
        ContentNegotiatingViewResolver resolver = new ContentNegotiatingViewResolver();
        resolver.setContentNegotiationManager(manager);

        List<ViewResolver> resolvers = new ArrayList<>();

        resolvers.add(pdfViewResolver());
        resolvers.add(xlsxViewResolver());
        resolvers.add(xlsViewResolver());
        resolvers.add(csvViewResolver());

        resolver.setViewResolvers(resolvers);
        return resolver;
    }

    @Bean
    public ViewResolver xlsViewResolver() {
        return new XlsViewResolver();
    }

    @Bean
    public ViewResolver xlsxViewResolver() {
        return new XlsxViewResolver();
    }

    @Bean
    public ViewResolver csvViewResolver() {
        return new CsvViewResolver();
    }
}
