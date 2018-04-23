package server.security.model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.StringUtils;

import java.util.List;

@Data
public class UserContext {
    private final String email;
    private final String name;
    private final Long id;
    private final List<GrantedAuthority> authorities;

    private UserContext(String email, String name, Long id, List<GrantedAuthority> authorities) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.authorities = authorities;
    }

    public static UserContext create(String email, String name, Long id, List<GrantedAuthority> authorities) {
        if (StringUtils.isEmpty(email)) throw new IllegalArgumentException("Email is blank: " + email);
        return new UserContext(email, name, id, authorities);
    }
}
