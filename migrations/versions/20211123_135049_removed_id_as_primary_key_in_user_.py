"""removed id as primary key in user_messages and added it to message_id

Revision ID: 3dc1cb06c3a9
Revises: 9427f8952f20
Create Date: 2021-11-23 13:50:49.417460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3dc1cb06c3a9'
down_revision = '9427f8952f20'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user_messages', 'message_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('user_messages', 'id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_messages', sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False))
    op.alter_column('user_messages', 'message_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###