using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController
    {
        private readonly IMediator _mediatr;

        public ActivitiesController(IMediator mediatr) => _mediatr = mediatr;

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List() => await _mediatr.Send(new List.Query());


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id) => await _mediatr.Send(new Details.Query{Id = id});

        [HttpPost]

        public async Task<ActionResult<Unit>> Create(Create.Command command) => await _mediatr.Send(command);

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command) 
        {
            command.Id = id;
            return await _mediatr.Send(command);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediatr.Send(new Delete.Command{Id = id});
        }   
    }
}

