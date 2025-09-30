###########################################################################
# 02 Deduce
###########################################################################


# Dependencies ------------------------------------------------------------

if(!"pacman" %in% installed.packages()) install.packages("pacman")
pacman::p_load(tidyverse)


# Import ------------------------------------------------------------------

states <- read_csv("data/processed/states.csv")


# Recognition over time ---------------------------------------------------

years <- tibble(year = seq(1988, 2025, 1))

counter <- states %>% 
  filter(!is.na(date)) %>% 
  count(date) %>% 
  full_join(years, by = c("date" = "year")) %>% 
  arrange(date) %>% 
  mutate(n = replace_na(n, 0),
         sum = accumulate(n, sum)) %>% 
  select(-n) %>% 
  rename(pro = sum) %>% 
  mutate(con = 192 - pro) 


# Recognition over time by continent (%) ----------------------------------

n_continent <- states %>% 
  count(continent, name = "total")

date_continent <- expand_grid(continent = n_continent$continent, 
                              year = years$year)

by_continent <- states %>% 
  filter(!is.na(date)) %>% 
  count(continent, date) %>% 
  full_join(date_continent, by = c("date" = "year", "continent")) %>% 
  full_join(n_continent, by ="continent") %>% 
  arrange(continent, date) %>% 
  group_by(continent) %>% 
  mutate(n = replace_na(n, 0),
         sum = accumulate(n, sum),
         share = round(sum / total, 4)) %>% 
  select(continent, 
         date,
         total,
         pro = sum,
         share) %>% 
  ungroup() %>% 
  reframe(continent, 
          date, 
          pct = round(share * 100, 4)) %>% 
  pivot_wider(names_from = continent, values_from = pct)


# Export ------------------------------------------------------------------

write_csv(counter, "data/processed/counter.csv")
write_csv(by_continent, "data/processed/by_continent.csv")

