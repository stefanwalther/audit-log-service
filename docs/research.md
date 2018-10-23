
## Implementation

- `event_domain` - The domain the event happens in, e.g. `auth`, `scheduler`.
- `event` - The event, e.g. `login`, `logout`, `change_password`
- `actor_group` - The group (aka organization, team, account) that the actor is a member of (needed to show admins the full history of their group). Typically the tenant id.
- `actor` - The username, uuid, API token name of the account taking the action. Typically the user id.
- `actor_details`
- `action_type` - The corresponding `C` `R` `U` `D` category.
- `description` - A human readable description of the action taken.
- `source` - Where does the event come from (which service), e.g. `/auth-service`.
- `level` - Severity level of the action (One of ``).
- `trace_id` - Internal trace id of the action (if available).
- `parent_trace_id` - Parent trace id of the action (if available).
- `details` - Contextual details.
- `debug_info` - Debugging information.
- `environment` - Information about the server environment.
- `actor_environment` - Information about the actor's environment.
- `ts` - Time stamp of the action (UTC).


## Thoughts

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
