
- [x] Event Domain - The domain where the event happened. In most of the cases this represents the service.
  - e.g. `AUTH`, `SYS`, `USER_SETTINGS`
- [x] Event Name - Common name for the event that can be used to filter down to similar events.
  - e.g. `AUTH_LOGOUT`, `AUTH_LOGIN`
- [x] tenant_id
- [x] user_id
- [ ] user_name
- [ ] start_date
- [ ] end_date
- [x] ts - Time stamp
- [x] description - Human readable description of the action taken.
- [x] ActionType - The corresponding `C` `R` `U` `D` category.
- [ ] source - Where does the event come from
  
## Further readings

- https://www.enterpriseready.io/features/audit-log/
