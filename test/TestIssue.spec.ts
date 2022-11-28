import { INestApplication } from "@nestjs/common";
import { getTestApp } from "@test/testModuleBuilder";
import { expect } from "chai";
import { DataSource, Repository } from "typeorm";

import { BadFlowChild } from "@app/db/entity/BadFlowChild";
import { BadFlowParent } from "@app/db/entity/BadFlowParent";
import { BadFlowRoot } from "@app/db/entity/BadFlowRoot";
import { GoodFlowChild } from "@app/db/entity/GoodFlowChild";
import { GoodFlowParent } from "@app/db/entity/GoodFlowParent";
import { GoodFlowRoot } from "@app/db/entity/GoodFlowRoot";

describe("Good flow test (integration)", () => {
  let app: INestApplication;
  let repoGoodFlowRoot: Repository<GoodFlowRoot>;
  let repoGoodFlowParent: Repository<GoodFlowParent>;
  let repoGoodFlowChild: Repository<GoodFlowChild>;
  let repoBadFlowRoot: Repository<BadFlowRoot>;
  let repoBadFlowParent: Repository<BadFlowParent>;
  let repoBadFlowChild: Repository<BadFlowChild>;

  before(async () => {
    app = await getTestApp();

    // load repositories for working part
    repoGoodFlowRoot = app
      .get(DataSource)
      .getRepository<GoodFlowRoot>(GoodFlowRoot);
    repoGoodFlowParent = app
      .get(DataSource)
      .getRepository<GoodFlowParent>(GoodFlowParent);
    repoGoodFlowChild = app
      .get(DataSource)
      .getRepository<GoodFlowChild>(GoodFlowChild);

    // load repositories for broken part
    repoBadFlowRoot = app
      .get(DataSource)
      .getRepository<BadFlowRoot>(BadFlowRoot);
    repoBadFlowParent = app
      .get(DataSource)
      .getRepository<BadFlowParent>(BadFlowParent);
    repoBadFlowChild = app
      .get(DataSource)
      .getRepository<BadFlowChild>(BadFlowChild);
  });

  it("Get good parent and verify child is there as well", async () => {
    const newRoot = new GoodFlowRoot();

    const newParent = new GoodFlowParent();
    newParent.root = newRoot;

    const newChild = new GoodFlowChild();
    newChild.content = "Test";
    newChild.parent = newParent;

    newRoot.child = await repoGoodFlowParent.save(newParent);
    const savedRoot = await repoGoodFlowRoot.save(newRoot);
    await repoGoodFlowChild.save(newChild);

    const searchResult = await repoGoodFlowRoot.findOneOrFail({
      where: {
        id: savedRoot.id,
      },
      relations: {
        child: {
          child: true,
        },
      },
    });

    expect(searchResult.id).eq(savedRoot.id);
    expect(searchResult.child).to.not.be.undefined;
    expect(searchResult.child.child).to.not.be.undefined;
    expect(searchResult.child.child.length).eq(1);
    expect(searchResult.child.child[0].content).eq("Test");
  });

  it("Get bad parent and verify child is there as well", async () => {
    const newRoot = new BadFlowRoot();

    const newParent = new BadFlowParent();
    newParent.root = newRoot;

    const newChild = new BadFlowChild();
    newChild.content = "Test";
    newChild.parent = newParent;

    newRoot.child = await repoBadFlowParent.save(newParent);
    const savedRoot = await repoBadFlowRoot.save(newRoot);
    await repoBadFlowChild.save(newChild);

    const searchResult = await repoBadFlowRoot.findOneOrFail({
      where: {
        id: savedRoot.id,
      },
      relations: {
        child: {
          child: true,
        },
      },
    });

    expect(searchResult.id).eq(savedRoot.id);
    expect(searchResult.child).to.not.be.undefined;
    expect(searchResult.child.child).to.not.be.undefined;
    expect(searchResult.child.child.length).eq(1);
    expect(searchResult.child.child[0].content).eq("Test");
  });
});
