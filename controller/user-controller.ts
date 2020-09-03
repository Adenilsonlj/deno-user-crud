import UserBusiness from "../business/actions-user.ts";
const bus = await new UserBusiness();

const getAll = async ({ response }: { response: any }) => {
  const users = await bus.getAll();
  response.body = {
    success: true,
    data: users,
  };
};

const get = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const user = await bus.get(params.id);
  if (!(Object.entries(user).length === 0)) {
    response.body = {
      success: true,
      data: { user },
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "User not found",
    };
  }
};

const insert = async (
  { request, response }: { request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const body = await request.body();
    const { name } = body.value;
    const obj = await bus.insert(name);
    response.status = 201;
    response.body = {
      success: true,
      data: obj,
    };
  }
};

const update = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const user = await bus.get(params.id);
  if (!(Object.entries(user).length === 0)) {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No data",
      };
    } else {
      const body = await request.body();
      const { name } = body.value;
      const item = await bus.update({
        id: params.id,
        name: name,
      });
      response.body = {
        success: true,
        msg: item,
      };
    }
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "User not found",
    };
  }
};

const remove = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const user = await bus.get(params.id);
  if (!(Object.entries(user).length === 0)) {
    const item = await bus.delete(params.id);
    response.body = {
      success: true,
      msg: item,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "User not found",
    };
  }
};

export { get, getAll, insert, update, remove };
