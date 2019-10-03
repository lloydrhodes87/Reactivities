using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController
    {
        [Route("api/[controller]")]
        [ApiController]

        public class ValuesController : ControllerBase
        {

            private readonly IMediator _mediatr;

            public ValuesController(IMediator mediatr) => _mediatr = mediatr;

            [HttpGet]
            public async Task<ActionResult<List<Activity>>> List() => await _mediatr.Send(new List.Query());
        }
    }

}