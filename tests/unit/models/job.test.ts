import db from "../../../src/adapters/output/db/db";
import Job from "../../../src/core/models/job";
import { JOB_ONE } from "../mocks/jobs";

const dbTeardown = async () => {
  await Job.sequelize?.query("SET FOREIGN_KEY_CHECKS = 0")
  await Job.destroy({ cascade: true, truncate: true, force: true });
  await Job.sequelize?.query("SET FOREIGN_KEY_CHECKS = 1")
}

describe('Job Model tests', () => {
  beforeAll(async () => {
    await db.sync({ force: true }); // This will use the test configuration
  });

  it('Should create a job', async () => {
    const job = await Job.create(JOB_ONE);
    expect(job.id).toEqual(1);
    expect(job.description).toEqual(JOB_ONE.description);
  });

  afterAll(async () => {
    await db.close();
  });
});
