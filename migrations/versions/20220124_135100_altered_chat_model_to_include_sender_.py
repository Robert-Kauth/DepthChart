"""altered chat model to include sender and recipient ids

Revision ID: 963d43c5ed31
Revises: 7dc90bc9da94
Create Date: 2022-01-24 13:51:00.572224

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '963d43c5ed31'
down_revision = '7dc90bc9da94'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('chats', sa.Column('sender_id', sa.Integer(), nullable=True))
    op.add_column('chats', sa.Column('recipient_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'chats', 'users', ['sender_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'chats', 'users', ['recipient_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'chats', type_='foreignkey')
    op.drop_constraint(None, 'chats', type_='foreignkey')
    op.drop_column('chats', 'recipient_id')
    op.drop_column('chats', 'sender_id')
    # ### end Alembic commands ###