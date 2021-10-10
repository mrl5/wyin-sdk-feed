# WYIN feed SDK

This is a **S**oftware **D**evelopment **K**it for serving historical events
under [WYIN project].


## Table of contents
* [Motivation](#motivation)
* [Overview](#overview)
* [Solution proposed by this project](#solution-proposed-by-this-project)
* [I want to contribute](#i-want-to-contribute)


## Motivation
1. Improve app response times
2. Reduce costs related to infrastructure
3. Reduce costs related to network traffic


## Overview
[wyin-fe-webapp] frontend depends on a service that is feeding it with data
(historical events) from `external source`s.

This can be done as `client-server` architecture. `server` part from the
beginning was handled by [wyin-be-feed] microservice. This approach has both
pros and cons, where **pros are**:
- `P1`) clear separation between presentation layer and data layer
- `P2`) interface enforcement
- `P3`) easier to define responsibilities
- `P4`) easier to define requirements

and **cons are**:
- `C1`) increased costs related to infrastructure
- `C2`) increased costs related to network traffic
- `C3`) additional network boundary
- `C4`) possible rate limiting from `external source`s causing **D**enial
  **o**f **S**ervice


## Solution proposed by this project
For WYIN usecases `server` layer can be replaced with `SDK` middleware that
will handle communication with `external source`s on client side and at the
same time preserve the separation between presentation layer and data layer.

By doing this `P1`, `P2` are kept, `C3`, `C4` are no longer present and `C1`,
`C2` stay on minimal level. Additional benefit is code reusability - the very
same `SDK` can be used on `client` side or used as handler logic for REST API.


## I want to contribute
Check out [CONTRIBUTING](CONTRIBUTING.md)



[WYIN project]: https://gitlab.com/spio-wyin
[wyin-fe-webapp]: https://gitlab.com/spio-wyin/wyin-fe-webapp
[wyin-be-feed]: https://gitlab.com/spio-wyin/wyin-be-feed
