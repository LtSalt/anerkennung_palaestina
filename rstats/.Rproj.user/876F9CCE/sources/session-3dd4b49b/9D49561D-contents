###########################################################################
# TITLE
###########################################################################

# TODO
# Frankreich?

# Dependencies ------------------------------------------------------------

if(!"pacman" %in% installed.packages()) install.packages("pacman")
pacman::p_load(tidyverse, janitor, lubridate, plotly, countries, rvest)

theme_set(theme_light())


# Import & Wrangle --------------------------------------------------------

states <- read_csv("data/anerkennung.csv")

states_cleaned <- states %>%
  select(-c(...1, Quelle)) %>% 
  clean_names() %>% 
  mutate(datum = as.integer(str_sub(datum, -4, -1)),
         anerkennung_israels = ifelse(anerkennung_israels == "ja",
                                      TRUE,
                                      FALSE))


# Plot --------------------------------------------------------------------

p <- states_cleaned %>% 
  mutate(land = fct_reorder(as.factor(land), datum)) %>% 
  ggplot() +
  geom_point(aes(x = land, y = datum, color = anerkennung_israels),
             size = 0.4) +
  geom_segment(aes(x = land, xend = land, 
                   y = datum, yend = 2025,
                   color = anerkennung_israels)) +
  geom_hline(yintercept = 2023, linetype = "dashed", linewidth = 0.2) +
  scale_y_reverse() +
  theme_minimal() +
  theme(axis.text.x = element_blank(),
        axis.ticks = element_blank(),
        panel.grid.minor = element_blank(),
        panel.grid.major.x = element_blank(),
        legend.position = "none") +
  labs(x = NULL,
       y = "Datum",
       color = NULL)

ggplotly(p)

  










  mutate(land = str_sub(land, 1, nchar(land) / 2)) %>% view()
  mutate(land = str_remove(land, "\\(.*")) %>%

  
as_date("15. Nov. 1988")