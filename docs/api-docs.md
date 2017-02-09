sammler-log-service
===================
**Version:** 0.0.5

**License:** MIT

### /logs
---
##### ***POST***
**Description:** Post `log` object.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| log | body |  | No | [log](#log) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Successfully created. | [logResult](#logResult) |

##### ***GET***
**Description:** Get all `log` objects.

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [logResult](#logResult) |

##### ***DELETE***
**Summary:** Delete all log entries.

**Description:** Delete all log entries.

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### /logs/:id
---
##### ***GET***
**Description:** Get log entry by Id.

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [logResult](#logResult) |

##### ***DELETE***
**Description:** Delete log entry by Id.

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### Models
---
<a name="log"></a>**log**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | No |
| source | string |  | No |
| level | string |  | No |
| message | object |  | No |
<a name="logResult"></a>**logResult**  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string |  | No |
| name | string |  | No |
| s5r_created_at | date |  | No |
| s5r_update_at | date |  | No |