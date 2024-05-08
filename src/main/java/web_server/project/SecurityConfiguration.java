package web_server.project;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration{
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity.authorizeHttpRequests(registry ->{
            registry.requestMatchers("/home").permitAll();
            registry.requestMatchers("/admin/**").hasRole("ADMIN");
            registry.requestMatchers(HttpMethod.DELETE, "/games/**").hasRole("ADMIN");
            registry.requestMatchers("/user/**").hasRole("USER");
            registry.anyRequest().authenticated();
        })
                .httpBasic() // Add this line for basic authentication
                .and()
                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)
                .build();
    }
    @Bean
    public UserDetailsService userDetailsService(){
        UserDetails normalUser = User.builder().
                username("gc").
                password("$2a$12$.8EJG5mxrQVx9HgWigkaKOzYjoPqAl7Dv7WBwGTaku6u2bNsqpooK").
                roles("USER").
                build();
        UserDetails adminUser = User.builder().
                username("admin").
                password("$2a$12$.8EJG5mxrQVx9HgWigkaKOzYjoPqAl7Dv7WBwGTaku6u2bNsqpooK").
                roles("ADMIN").
                build();
        return new InMemoryUserDetailsManager(normalUser,adminUser);
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
